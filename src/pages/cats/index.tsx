import Head from "next/head";
import { Cat, CRUDType } from "@/domain/cat";
import { Modal, Table } from "react-bootstrap";
import { CatsService } from "@/services/api/cats-service";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import CatForm from "@/components/forms/CatForm";

const service = new CatsService();

interface IProps {
  cats_: Cat[];
}

export default function CatsPage({ cats_ }: any) {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [descriptionFilter, setDescriptionFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [catIndex, setCatIndex] = useState<number>(0);
  const [cat, setCat] = useState<Cat>();
  const [cats, setCats] = useState<Cat[]>(cats_);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseModal = (crudType: CRUDType) => {
    if (crudType === CRUDType.DELETE) setShowDeleteModal(false);
    else if (crudType === CRUDType.UPDATE) setShowUpdateModal(false);
    else if (crudType === CRUDType.CREATE) setShowCreateModal(false);
  };

  const handleShowModal = (crudType: CRUDType, index: number) => {
    if (index > -1) {
      setCatIndex(index);
      setCat(cats[index]);
    }

    if (crudType === CRUDType.DELETE) setShowDeleteModal(true);
    else if (crudType === CRUDType.UPDATE) setShowUpdateModal(true);
    else if (crudType === CRUDType.CREATE) setShowCreateModal(true);
  };

  const catFilter = async () => {
    setLoading(true);
    await axios
      .get<Cat[]>(
        "/api/cats?name=" + nameFilter + "&description=" + descriptionFilter
      )
      .then((response) => {
        setCats(response.data);
        setLoading(false);
      });
  };

  const deleteCat = async () => {
    await fetch("/api/cats/" + cat?.id, { method: "DELETE" }).then(() => {
      setCats(cats.filter((c, i) => i !== catIndex));
      handleCloseModal(CRUDType.DELETE);
    });
  };

  const updateCat = async (cat: Cat) => {
    await axios.put<Cat>("/api/cats", cat).then((response) => {
      const tempCats = cats;
      tempCats[catIndex] = response.data;
      setCats(tempCats);
      handleCloseModal(CRUDType.UPDATE);
    });
  };

  const registerCat = async (cat: Cat) => {
    await axios.post<Cat>("/api/cats", cat).then((response) => {
      setCats((cats) => [...cats, response.data]);
      handleCloseModal(CRUDType.CREATE);
    });
  };

  const onSubmitForSave = async (values: Cat) => {
    if (values.id) {
      await updateCat(values);
    } else {
      await registerCat(values);
    }
  };

  return (
    <>
      <Head>
        <title>View your cats</title>
        <meta name="description" content="Register your animal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex mb-5">
          <div className="form-group ml-sm-3 mb-2">
            <label htmlFor="nameFilter" className="sr-only">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameFilter"
              placeholder="Start with"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="descriptionFilter" className="sr-only">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="descriptionFilter"
              placeholder="Contains"
              value={descriptionFilter}
              onChange={(e) => setDescriptionFilter(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-2 mt-4"
            disabled={loading}
            onClick={() => catFilter()}
          >
            Search
          </button>
        </div>

        <div className="d-flex justify-content-between">
          <h1>View your cats</h1>
          <button
            type="button"
            className="btn btn-primary my-2"
            onClick={() => handleShowModal(CRUDType.CREATE, -1)}
          >
            Register your cat
          </button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cats?.length > 0 &&
              cats.map((c: Cat, index: number) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.description}</td>
                  <td className="d-flex justify-content-around">
                    <Link href={`/cats/${c.id}`} className="btn btn-primary">
                      View
                    </Link>

                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => handleShowModal(CRUDType.UPDATE, index)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShowModal(CRUDType.DELETE, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </main>

      {/* Delete modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => handleCloseModal(CRUDType.DELETE)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete cat recod</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete cat record ?</Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleCloseModal(CRUDType.DELETE)}
          >
            Close
          </button>
          <button type="button" className="btn btn-danger" onClick={deleteCat}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Update modal */}
      <Modal
        show={showUpdateModal}
        onHide={() => handleCloseModal(CRUDType.UPDATE)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update cat record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CatForm
            onSubmit={onSubmitForSave}
            handleCloseModal={handleCloseModal}
            crudType={CRUDType.UPDATE}
            cat_={cat}
          />
        </Modal.Body>
      </Modal>

      {/* Record modal */}
      <Modal
        show={showCreateModal}
        onHide={() => handleCloseModal(CRUDType.CREATE)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Record your cat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CatForm
            onSubmit={onSubmitForSave}
            handleCloseModal={handleCloseModal}
            crudType={CRUDType.CREATE}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context: any) {
  try {
    const cats_ = await service.all();
    return { props: { cats_ } };
  } catch (err) {
    console.log(err);
    return { notFound: true };
  }
}
