import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'

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

test('test 5.13: show blog item but not show blog detail', () => {
  const component = render(
    <Blog blog={blog} del={() => {
    }} addLike={() => {
    }}/>,
  )

  expect(component.container.querySelector('.blogItem')).toHaveStyle('display: block')
  expect(component.container.querySelector('.blogDetail')).toHaveStyle('display: none')
})
test('test 5.14: blog detail is shown after click the view button', () => {
  const component = render(
    <Blog blog={blog} del={() => {
    }} addLike={() => {
    }}/>,
  )
  const btn = component.getByText('view')
  fireEvent.click(btn)
  expect(component.container.querySelector('.blogDetail')).toHaveStyle('display: block')
  fireEvent.click(btn)
  expect(component.container.querySelector('.blogDetail')).toHaveStyle('display: none')
})
test('test 5.15: like btn is clicked twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} del={() => {
    }} addLike={() => mockHandler}/>,
  )
  const btn = component.getByText('like')
  fireEvent.click(btn)
  fireEvent.click(btn)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
