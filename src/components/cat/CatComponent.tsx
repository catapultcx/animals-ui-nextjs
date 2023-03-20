import { Cat } from '@/domain/cat';
import { CatsService } from '@/services/api/cats-service';
import { OnCancel, OnChange, OnSubmit } from './CatFormActions';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CatForm from './CatForm';

interface CatCompProps {
  cat?: Cat;
}

const service = new CatsService();

export default function CatComp ({cat}: CatCompProps) {
  const [newCat, setNewCat] = useState<Cat>(
    cat || {
      id: '',
      name: '',
      description: '',
      group: ''
    }
  );

  const router = useRouter();

  const onChange: OnChange = ({target}: any) => {
    const {name, value} = target;
    setNewCat((prevState: Cat) => {
      return {...prevState, [name]: value};
    });
  };

  const onSubmit: OnSubmit = (event) => {
    event.preventDefault();

    if (event.currentTarget.checkValidity()) {
      if (newCat.id) {
        updateCat();
      } else {
        router.push('/cats')
      }
    }
  };

  const onCancel: OnCancel = (event) => {
    event.preventDefault();
    if (newCat.id) {
      router.push(`/cats/${newCat.id}`)
    } else {
      router.push('/cats')
    }
  };

  const updateCat = () => {
    service
      .update({ cat: newCat })
      .then(() => {
        router.push("/cats");
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return <CatForm cat={newCat} onSubmit={onSubmit} onChange={onChange} onCancel={onCancel}/>;
}
