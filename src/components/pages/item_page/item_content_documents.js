import React, { Component } from 'react';
import { object, array, bool } from 'prop-types';
import DocumentsList from './documents_list';

export default class ItemContentDocuments extends Component {
  static propTypes = {
    item: object,
    documents: array,
    isGrid: bool
  };

  state = {
    item: null,
    documents: [],
    isGrid: false
  };

  render() {
    const { item, documents } = this.props;

    return (
      <DocumentsList
        item={item}
        documents={documents}
        isGrid={this.props.isGrid}
      />
    );
  }
}
