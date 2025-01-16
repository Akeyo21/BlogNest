import React from 'react'
import {render} from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { MemoryRouter } from 'react-router-dom'

const TestProviders = ({children}) => {
  return (
    <ChakraProvider >
        <MemoryRouter>
            {children}
        </MemoryRouter>
    </ChakraProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: TestProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}