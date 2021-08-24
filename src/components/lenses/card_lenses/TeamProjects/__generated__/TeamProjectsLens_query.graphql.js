/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamProjectsLens_query$ref: FragmentReference;
declare export opaque type TeamProjectsLens_query$fragmentType: TeamProjectsLens_query$ref;
export type TeamProjectsLens_query = {|
  +activePeopleOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +collapsedIdsConfig: ?{|
    +value: ?any
  |},
  +$refType: TeamProjectsLens_query$ref,
|};
export type TeamProjectsLens_query$data = TeamProjectsLens_query;
export type TeamProjectsLens_query$key = {
  +$data?: TeamProjectsLens_query$data,
  +$fragmentRefs: TeamProjectsLens_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "lenseKey"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "ownerId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamProjectsLens_query",
  "selections": [
    {
      "alias": "activePeopleOrder",
      "args": [
        {
          "kind": "Variable",
          "name": "lenseId",
          "variableName": "lenseId"
        },
        {
          "kind": "Variable",
          "name": "lenseKey",
          "variableName": "lenseKey"
        },
        {
          "kind": "Literal",
          "name": "orderType",
          "value": "people"
        },
        {
          "kind": "Variable",
          "name": "topicId",
          "variableName": "topicId"
        }
      ],
      "concreteType": "CustomOrder",
      "kind": "LinkedField",
      "name": "activeCustomOrder",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "order",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "collapsedIdsConfig",
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "TEAM_PROJECTS.collapsed_ids"
        },
        {
          "kind": "Variable",
          "name": "owner",
          "variableName": "ownerId"
        }
      ],
      "concreteType": "Config",
      "kind": "LinkedField",
      "name": "config",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'eebcd298f95d628ac27904640c3630e2';

module.exports = node;
