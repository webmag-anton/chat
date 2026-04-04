import { render, screen } from '@testing-library/react'
import { DemoProfilesList } from './DemoProfilesList'
import { demoUsers } from '../model/demoUsers'

describe('DemoProfilesList', () => {
  it('renders the list container', () => {
    render(<DemoProfilesList />)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })

  it('renders the same number of list items as in demoUsers', () => {
    render(<DemoProfilesList />)

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(demoUsers.length)
  })

  it('layout does not change unexpectedly', () => {
    const { container } = render(<DemoProfilesList />)

    expect(container.firstChild).toMatchSnapshot()
  })
})