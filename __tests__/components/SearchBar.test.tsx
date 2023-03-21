import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import {testCat2, testCats} from '../data'

import {setUpFetchSuccessMock} from '../utils'
import SearchBar from '@/components/SearchBar'
import React, {SetStateAction, useState} from 'react'
import {Cat} from '@/domain/cat'

jest.mock('next/router', () => require('next-router-mock'))

describe('Search Bar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should render without crashing', () => {
    const setSearch = (_: SetStateAction<{cats: Cat[]} | null>) => {}
    const setError = (_: SetStateAction<string>) => {}

    render(<SearchBar onSearch={setSearch} onError={setError}/>)

    expect(screen.getByRole('textbox', {name: 'Name input'})).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: 'Description input'})).toBeInTheDocument()
  })

  it('should call onSearch callback if form has been submitted successfully', async () => {
    setUpFetchSuccessMock({cats: [testCat2]})

    const Wrapper = () => {
      const [catList, setCatList] = useState<{cats: Cat[]} | null>( {cats: testCats })
      const [errorMessage, setErrorMessage] = useState('')

      return (
          <div>
            <input aria-label={'List of cats'} data-cats={catList?.cats.map(c => c.name)}></input>
            <SearchBar onSearch={setCatList} onError={setErrorMessage}/>
          </div>
      )
    }

    render(<Wrapper />)

    const nameInput = screen.getByRole('textbox', {name: 'Name input'})
    const descriptionInput = screen.getByRole('textbox', {name: 'Description input'})

    fireEvent.change(nameInput, {target: {value: 'Garfield'}})
    fireEvent.change(descriptionInput, {target: {value: 'Lazy cat'}})

    const submitButton = screen.getByRole('button', { name: 'Filter'})

    fireEvent.click(submitButton)

    await waitFor(() => {
      const div = screen.getByRole('textbox', {name: 'List of cats'}) as HTMLElement

      const cats = div.getAttribute('data-cats')

      expect(cats).toBe('Garfield')
    })
  })

  it('should show input error messages when form is submitted', async () => {
    const setSearch = (_: SetStateAction<{cats: Cat[]} | null>) => {}
    const setError = (_: SetStateAction<string>) => {}

    render(<SearchBar onSearch={setSearch} onError={setError}/>)

    const submitButton = screen.getByRole('button', { name: 'Filter'})

    fireEvent.click(submitButton)

    const nameErrorText = screen.getByText('Please provide a name.')
    const descriptionErrorText = screen.getByText('Please provide a description.')

    expect(nameErrorText).toBeInTheDocument()
    expect(descriptionErrorText).toBeInTheDocument()
  })
})
