import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Editor from '@/components/animal/editor';

describe('Editor', () => {
  it('should render editor', () => {
    render(<Editor onSave={()=>Promise.resolve()}/>);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('should render empty editor with button disabled', () => {
    render(<Editor onSave={()=>Promise.resolve()}/>);

    expectInputsToHaveValues("", "");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it('should render editor with correct values and button enabled', () => {
    const cat = {name:'Phoebe\'s cat', description:"Smelly cat....", group:"", id:"111"};
    render(<Editor 
                animal={cat} 
                onSave={()=>Promise.resolve()}/>);

    expectInputsToHaveValues(cat.name, cat.description);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it('should enable button when field values are typed in', () => {
    render(<Editor 
                onSave={()=>Promise.resolve()}/>);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value:'my cat'}});
    fireEvent.change(screen.getByLabelText('Description'), {target: {value:'my desc'}});
    
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it('onSave should provie update values', () => {
    const cat = {name:'Phoebe\'s cat', description:"Smelly cat....", group:"", id:"111"};
    const expectedName = 'my cat',
          expectedDescription = 'my desc';

    let actualName = '',
        actualDescription = '';
    render(<Editor 
                animal={cat}
                onSave={(name, desscription)=>{
                    actualName = name;
                    actualDescription = desscription;
                    return Promise.resolve()}
                }/>);

    fireEvent.change(screen.getByLabelText('Name'), {target: {value:'my cat'}});
    fireEvent.change(screen.getByLabelText('Description'), {target: {value:'my desc'}});
   
    fireEvent.click(screen.getByRole('button'));

    expect(actualName).toEqual(expectedName);
    expect(actualDescription).toEqual(expectedDescription);
  });

  
});

function expectInputsToHaveValues(name:string, description:string){
    expect(screen.getByLabelText('Name')).toHaveValue(name);
    expect(screen.getByLabelText('Description')).toHaveValue(description);
}
