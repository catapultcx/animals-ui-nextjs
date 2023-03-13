import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Cat, CRUDType } from "@/domain/cat";

interface IProps {
    initialValues?: Cat;
    onSubmit: (values: Cat) => Promise<void>;
    handleCloseModal: any;
    crudType: CRUDType;
    cat_?: Cat;
}

const schema = yup.object<Cat>({
    id: yup.string(),
    name: yup.string().required("Name required"),
    description: yup.string().required("Decription required"),
});

const CatForm = ({ initialValues, onSubmit, handleCloseModal, crudType, cat_ }: IProps) => {
    const { register, formState, handleSubmit, setValue } = useForm<Cat>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        if (cat_) {
            const fields = ["name" as keyof Cat, "description" as keyof Cat, "id" as keyof Cat];
            fields.forEach((field) => setValue(field, cat_[field]));
        }
    }, [cat_, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" id="id" name="id" />
            <div className="form-group  mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Name" {...register("name")} />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" placeholder="Description" {...register("description")} />
            </div>
            <div className="d-flex justify-content-between  mb-3">
                <button type="submit" className="btn btn-primary" disabled={!formState.isValid}>
                    Save
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => handleCloseModal(crudType)}>
                    Close
                </button>
            </div>
        </form>
    );
};

export default CatForm;
