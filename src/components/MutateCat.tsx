import { Cat } from '@/domain/cat';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

interface MutateCatProps {
    cat?: Cat;
    btnClickCallback(cat: Cat): void;
}

export const MutateCat: FC<MutateCatProps> = ({cat, btnClickCallback}) => {
  const [ updatedCat, setUpdatedCat ] = useState<Cat>();

  useEffect(() => {
    setUpdatedCat(cat);
  }, [cat]);
  
  const handleCatUpdate = useCallback((attribute: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setUpdatedCat((pre: any) => {
        return {
          ...(pre ?? {}),
          [attribute]: e.target.value,
        }
      })
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updatedCat) {
      btnClickCallback(updatedCat);
    }
  }, [btnClickCallback, updatedCat]);


  return  (<Form onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="catName">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control type="text" placeholder="Cat Name" defaultValue={updatedCat?.name} onChange={handleCatUpdate('name')}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="catDescription">
      <Form.Label>Cat Description</Form.Label>
      <Form.Control type="text" placeholder="Cat Description" defaultValue={updatedCat?.description} onChange={handleCatUpdate('description')}/>
    </Form.Group>
  
    <Button variant="primary" type="submit">
       {cat ? 'Update' : 'Create'}
    </Button>
</Form>)
} 
