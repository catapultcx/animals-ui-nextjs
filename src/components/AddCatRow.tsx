import { createRef, FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import {Cat} from "@/domain/cat";

type AddCatRowType = {
  successHandler: (cat: Cat) => void
}

type AddState = 'adding' | 'failed' | 'success' | ''

export const AddCatRow: FC<AddCatRowType> = ({ successHandler }) => {
  const [addState, setAddState] = useState<AddState>('')
  const nameRef = createRef<HTMLTableCellElement>()
  const descRef = createRef<HTMLTableCellElement>()
  const handleClickAdd = async () => {
    try {
      const name = nameRef.current?.innerText || ''
      const description =  descRef.current?.innerText || ''
      if (!name || !description) {
        return
      }
      setAddState('adding')
      const fetchResponse = await fetch('/api/postCat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      })
      if (!fetchResponse.ok) {
        setAddState('failed')
      } else {
        setAddState('success')
        successHandler(await fetchResponse.json())
      }
    } catch {
      setAddState('failed')
    }
  }
  const isAdding = addState === 'adding'
  const isFailed = addState === 'failed'
  const isSuccess = addState === 'success'
  const variant = isSuccess ? 'success': isFailed ? 'danger' : 'primary'
  const isDisabled = isAdding || isSuccess
  const buttonLabel = isAdding ? '...' : isSuccess ? 'Added' : 'Add'
  return (
      <tr>
        <td>&nbsp;</td>
        <td contentEditable data-label="name" data-testid="name" ref={nameRef} suppressContentEditableWarning={true}></td>
        <td contentEditable data-label="desc" data-testid="desc" ref={descRef} suppressContentEditableWarning={true}></td>
        <td>
          <Button onClick={handleClickAdd} variant={variant} disabled={isDisabled} data-testid="Add-button">{buttonLabel}</Button>
        </td>
      </tr>
  )
}
