import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render, waitFor } from '@testing-library/react'
import Blog from './Blog'
import NewBlog from './NewBlog'

const title = 'title for test'
const blog = {
  title,
  author: 'test author',
  url: 'https://testurl.com',
  likes: 11,
  user: {
    id: 'testuserid',
  },
}

test('test 5.16: check the event handler received right details', async () => {
  const addBlog = jest.fn()
  const component = render(
    <NewBlog addBlog={addBlog}/>,
  )
  const input = component.container.querySelector('.new-blog-title')
  const form = component.container.querySelector('form')
  const testBlogTitle = 'test blog title'
  fireEvent.change(input, {
    target: {
      value: testBlogTitle,
    },
  })
  fireEvent.submit(form)
  await waitFor(() => {
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe(testBlogTitle)
  })
})
