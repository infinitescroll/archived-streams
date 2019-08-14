import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useFilters } from '../../hooks'
import { AlignItemsColumn } from '../../styled/components'
import {
  BLUE_TRANSP,
  DARK_BLUE,
  MID_BLUE,
  BR_CREAM,
  DARK_LILAC,
  BR_PINK
} from '../../styled/themes'

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  margin-left: 0.875rem;
  margin-right: 0.875rem;

  background: ${BR_PINK};
  border: solid 2px ${DARK_LILAC};
  border-radius: 4px;
`

const Label = styled.summary`
  padding-bottom: 0.25rem;
  margin-bottom: 0.875rem;
  border-bottom: 1px solid ${DARK_BLUE};
  color: ${DARK_BLUE};
  font-weight: bold;
  font-family: Futura, Segoe UI, 'system-ui', sans-serif;
  font-size: 1.125rem;
  letter-spacing: 0.5pt;
  min-width: max-content;
  white-space: nowrap;
`
const FilterButton = styled.button`
  margin: 0.25rem;
  border: 1px solid ${BLUE_TRANSP};
  border-radius: 4px;

  font-size: 1rem;
  font-family: 'Lucida Console', Monaco, monospace;
  cursor: pointer;
`
const FilterDetails = styled.details`
  & :focus {
    outline: none;
  }
  cursor: pointer;
`
const FilterList = styled.div`
  max-height: 15rem;
  overflow: scroll;
`

const Filters = ({ types, users }) => {
  const { filters, filterEvents, unfilterEvents } = useFilters()

  return (
    <FiltersContainer>
      <AlignItemsColumn>
        <FilterDetails>
          <Label>Filter By User:</Label>
          <FilterList>
            {users.map(user => {
              return (
                <FilterButton
                  key={user}
                  style={{
                    color:
                      filters.users.indexOf(user) > -1 ? BR_CREAM : MID_BLUE,
                    backgroundColor:
                      filters.users.indexOf(user) > -1 ? MID_BLUE : BR_CREAM
                  }}
                  onClick={() => {
                    if (filters.users.indexOf(user) > -1) {
                      unfilterEvents('user', user)
                    } else {
                      filterEvents('user', user)
                    }
                  }}
                >
                  {user} {filters.users.indexOf(user) > -1 ? ' ✓' : '  '}
                </FilterButton>
              )
            })}
          </FilterList>
        </FilterDetails>
      </AlignItemsColumn>
      <AlignItemsColumn>
        <FilterDetails>
          <Label>Filter By Activity Type:</Label>
          <FilterList>
            {types.map(type => {
              return (
                <FilterButton
                  key={type}
                  style={{
                    color:
                      filters.types.indexOf(type) > -1 ? BR_CREAM : MID_BLUE,
                    backgroundColor:
                      filters.types.indexOf(type) > -1 ? MID_BLUE : BR_CREAM
                  }}
                  onClick={() => {
                    if (filters.types.indexOf(type) > -1) {
                      unfilterEvents('type', type)
                    } else {
                      filterEvents('type', type)
                    }
                  }}
                >
                  {type}
                  {filters.types.indexOf(type) > -1 ? ' ✓' : ''}
                </FilterButton>
              )
            })}
          </FilterList>
        </FilterDetails>
      </AlignItemsColumn>
    </FiltersContainer>
  )
}

Filters.propTypes = {
  types: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default Filters
