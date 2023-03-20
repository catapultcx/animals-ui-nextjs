import { Cat } from '@/domain/cat';
import { FC } from 'react';
import { Table } from 'react-bootstrap';

interface ViewCatProps {
    cat: Cat
}

export const ViewCat: FC<ViewCatProps> = ({cat}) => {
  return <Table striped bordered hover>
    <tbody>
      <tr>
        <td>ID</td>
        <td>{cat.id}</td>
      </tr>             
      <tr>
        <td>Name</td>
        <td>{cat.name}</td>
      </tr>             
      <tr>
        <td>Description</td>
        <td>{cat.description}</td>
      </tr>                                        
    </tbody>
  </Table>
} 
