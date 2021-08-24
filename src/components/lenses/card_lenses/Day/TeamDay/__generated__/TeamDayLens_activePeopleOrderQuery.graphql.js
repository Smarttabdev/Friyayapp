/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TeamDayLens_activePeopleOrderQuery$ref: FragmentReference;
declare export opaque type TeamDayLens_activePeopleOrderQuery$fragmentType: TeamDayLens_activePeopleOrderQuery$ref;
export type TeamDayLens_activePeopleOrderQuery = {|
  +activePeopleOrder: ?{|
    +id: string,
    +name: ?string,
    +order: ?$ReadOnlyArray<string>,
  |},
  +$refType: TeamDayLens_activePeopleOrderQuery$ref,
|};
export type TeamDayLens_activePeopleOrderQuery$data = TeamDayLens_activePeopleOrderQuery;
export type TeamDayLens_activePeopleOrderQuery$key = {
  +$data?: TeamDayLens_activePeopleOrderQuery$data,
  +$fragmentRefs: TeamDayLens_activePeopleOrderQuery$ref,
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
      "name": "topicId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TeamDayLens_activePeopleOrderQuery",
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '27707be6a262ccdcea30b6e3c0010edb';

module.exports = node;
