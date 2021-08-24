/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizerQuizScreenThree_query$ref: FragmentReference;
declare export opaque type OrganizerQuizScreenThree_query$fragmentType: OrganizerQuizScreenThree_query$ref;
export type OrganizerQuizScreenThree_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: OrganizerQuizScreenThree_query$ref,
|};
export type OrganizerQuizScreenThree_query$data = OrganizerQuizScreenThree_query;
export type OrganizerQuizScreenThree_query$key = {
  +$data?: OrganizerQuizScreenThree_query$data,
  +$fragmentRefs: OrganizerQuizScreenThree_query$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "owner"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrganizerQuizScreenThree_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "ORGANIZER_QUIZ.favorite_tools_screen3"
        },
        {
          "kind": "Variable",
          "name": "owner",
          "variableName": "owner"
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
          "name": "id",
          "storageKey": null
        },
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
(node/*: any*/).hash = 'c5299415956cb1e9efdb3bf4bd59627d';

module.exports = node;
