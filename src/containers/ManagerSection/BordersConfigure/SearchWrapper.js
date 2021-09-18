import React, { useContext, useState, useRef, useEffect } from 'react'

import { Paper, InputBase, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

import { BorderContext } from '../../../_contexts/BorderContext';
import useDebounce from '../../../customHooks/useDebounce';

const useStyles = makeStyles(theme => ({
  searchPaper: {
    padding: "0 16px",
    maxWidth: 400,
    margin: "16px auto"
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  input: {
    width: "90%"
  }
}))

export default function SearchWrapper(props) {
  const { bordersState } = useContext(BorderContext)
  const [input, setInput] = useState("")
  const submissionRef = useRef(false)
  const [borders, setBorders] = useState(bordersState.borders)
  const classes = useStyles()

  useEffect(() => {
    setBorders(bordersState.borders)
  }, [bordersState.borders])

  const onBorderSearch = (text) => {
    let unMatched = []
    const filtered = bordersState.borders.filter(border => {
      let regex = new RegExp(text.toLowerCase())
      let borderName = (border.username).toLowerCase()
      let isMatched = regex.test(borderName)
      if (!isMatched) {
        unMatched.push(border)
      }
      return isMatched
    })
    return [filtered, unMatched]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    submissionRef.current = true
    const filtered = onBorderSearch(input)[0]
    setBorders([...filtered])
  }

  const handleSearch = useDebounce((e) => {
    // When handleSubmit is handling search, no need 
    // this function to be executed
    if (submissionRef.current) return;
    const borders = onBorderSearch(e.target.value)
    setBorders([...borders[0], ...borders[1]])
  }, 1000)

  return (
    <div>
      <Paper className={classes.searchPaper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <InputBase
            id="search"
            value={input}
            onFocus={() => submissionRef.current = false}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearch}
            className={classes.input}
            placeholder="Search by border name"
            inputProps={{ 'aria-label': 'search by border name' }} />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </form>
      </Paper>
      <div>
        {props.render(borders, setBorders, bordersState.borders)}
      </div>
    </div>
  )
}