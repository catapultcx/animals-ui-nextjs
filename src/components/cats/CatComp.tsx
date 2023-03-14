import { Cat, Group } from "@/domain/cat";
import { CatsService } from "@/services/api/cats-service";
import { OnChange, OnSubmit } from "@/utils/formUtils";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import CatForm from "./CatForm";

interface CatCompProps {
  cat?: Cat;
}

const service = new CatsService();

export default function CatComp({ cat }: CatCompProps) {
  const [newCat, setNewCat] = useState<Cat>(
    cat || { id: "", name: "", description: "", group: Group.MAMMALS }
  );
  const isEditMode = !!cat;
  const router = useRouter();

  const onChange: OnChange = ({ target }: any) => {
    const { name, value } = target;
    setNewCat((prevState: Cat) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit: OnSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      if (isEditMode) {
        updateCat();
      } else {
        createCat();
      }
    }
  };

  const createCat = () => {
    service
      .create({ cat: newCat })
      .then((resp) => {
        toast("Cat created successfully!", { type: "success" });
        router.push("/cats");
      })
      .catch((err) => {
        toast("Error occured. Please try again later.", { type: "error" });
      });
  };

  const updateCat = () => {
    service
      .update({ cat: newCat })
      .then((resp) => {
        toast("Cat updated successfully!", { type: "success" });
        router.push("/cats");
      })
      .catch((err) => {
        toast("Error occured. Please try again later.", { type: "error" });
      });
  };

  return <CatForm cat={newCat} onSubmit={onSubmit} onChange={onChange} />;
}
