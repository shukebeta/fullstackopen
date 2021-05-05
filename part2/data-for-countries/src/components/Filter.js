import React from 'react'

const Filter = ({keyword, onKeywordInput}) => {
  return (
    <div>Find countries <input value={keyword} onInput={onKeywordInput}/></div>
  )
}

export default Filter
