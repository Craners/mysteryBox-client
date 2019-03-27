import React, { Component } from 'react'
import { TextStyle, Avatar, FilterType, Card, ResourceList } from '@shopify/polaris'
import './ResourceListItem.css'

export default class ResourceListItem extends Component {
  state = {
    selectedItems: [],
    sortValue: 'DATE_MODIFIED_DESC',
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
  }
  handleSearchChange = (searchValue) => {
    this.setState({ searchValue })
  }
  handleFiltersChange = (appliedFilters) => {
    this.setState({ appliedFilters })
  }
  handleSortChange = (sortValue) => {
    this.setState({ sortValue })
  }
  handleSelectionChange = (selectedItems) => {
    this.setState({ selectedItems })
  }
  renderItem = (item) => {
    const { id, url, name, location, latestOrderUrl } = item
    const media = <Avatar customer size="medium" name={name} />
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null
    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    )
  }
  render() {
    const resourceName = {
      singular: 'customer',
      plural: 'customers',
    }
    const items = [
      {
        id: 341,
        url: 'customers/341',
        name: 'Mae Jemison',
        location: 'Decatur, USA',
        latestOrderUrl: 'orders/1456',
      },
      {
        id: 256,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
      {
        id: 257,
        url: 'customers/256',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
      {
        id: 258,
        url: 'customers/258',
        name: 'Ellen Ochoa',
        location: 'Los Angeles, USA',
        latestOrderUrl: 'orders/1457',
      },
    ]
    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ]
    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ]
    const filters = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ]
    const filterControl = (
      <ResourceList.FilterControl
        filters={filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        additionalAction={{
          content: 'Save',
          onAction: () => console.log('New filter saved'),
        }}
      />
    )
    return (
      <div className="marginsClass">
        <Card>
          <ResourceList
            resourceName={resourceName}
            items={items}
            renderItem={this.renderItem}
            selectedItems={this.state.selectedItems}
            onSelectionChange={this.handleSelectionChange}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            sortValue={this.state.sortValue}
            sortOptions={[
              { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
              { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
            ]}
            onSortChange={(selected) => {
              this.setState({ sortValue: selected })
              console.log(`Sort option changed to ${selected}.`)
            }}
            filterControl={filterControl}
          />
        </Card>
      </div>
    )
  }
}
