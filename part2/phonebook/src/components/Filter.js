import React from 'react'

const Filter = ({keyword, onKeywordInput}) => {
  return (
    <div>Filter shown with <input value={keyword} onInput={onKeywordInput}/></div>
  )
}

export default Filter
