import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useFilters } from '../../hooks'
import mockStreamServer from '../../mockStreamsServer'
import { AlignItemsColumn } from '../../styled/components'
import { BLUE_TRANSP, DARK_BLUE, MID_BLUE, BR_CREAM } from '../../styled/themes'

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
export const FilterButton = styled.button`
  margin: 0.25rem;
  border: 1px solid ${BLUE_TRANSP};
  border-radius: 4px;

  font-size: 1rem;
  font-family: 'Lucida Console', Monaco, monospace;
  cursor: pointer;
`
const FilterDetails = styled.div`
  & :focus {
    outline: none;
  }
  cursor: pointer;
`
const FilterList = styled.div`
  max-height: 15rem;
  overflow: scroll;
`

const Filters = ({ types }) => {
  const { filters, filterEvents, unfilterEvents } = useFilters()
  const filterOptions = ['Pulls', 'Issues', 'Branches', 'Releases']
  const users = mockStreamServer.getUsers()
  const usernames = []
  Object.keys(users).forEach(item => usernames.push(users[String(item)].title))
  usernames.forEach(item => filterOptions.push(item))

  return (
    <AlignItemsColumn>
      <FilterDetails>
        <Label>Filter events:</Label>
        <FilterList>
          {filterOptions.map(option => {
            return (
              <FilterButton
                key={option}
                style={{
                  color:
                    filters.types.indexOf(option) > -1 ||
                    filters.users.indexOf(option) > -1
                      ? BR_CREAM
                      : MID_BLUE,
                  backgroundColor:
                    filters.types.indexOf(option) > -1 ||
                    filters.users.indexOf(option) > -1
                      ? MID_BLUE
                      : BR_CREAM
                }}
                onClick={() => {
                  const getType = () => {
                    if (usernames.indexOf(option) > -1) return 'user'
                    return 'type'
                  }

                  if (
                    filters.users.indexOf(option) > -1 ||
                    filters.types.indexOf(option) > -1
                  )
                    unfilterEvents(getType(), option)
                  else filterEvents(getType(), option)
                }}
              >
                {option}
                {filters.users.indexOf(option) > -1 ||
                filters.types.indexOf(option) > -1
                  ? ' ✓'
                  : ''}
              </FilterButton>
            )
          })}
        </FilterList>
      </FilterDetails>
    </AlignItemsColumn>
  )
}

Filters.propTypes = {
  types: PropTypes.array.isRequired
}

export default Filters
