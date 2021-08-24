/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizerQuizScreenTwo_query$ref: FragmentReference;
declare export opaque type OrganizerQuizScreenTwo_query$fragmentType: OrganizerQuizScreenTwo_query$ref;
export type OrganizerQuizScreenTwo_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: OrganizerQuizScreenTwo_query$ref,
|};
export type OrganizerQuizScreenTwo_query$data = OrganizerQuizScreenTwo_query;
export type OrganizerQuizScreenTwo_query$key = {
  +$data?: OrganizerQuizScreenTwo_query$data,
  +$fragmentRefs: OrganizerQuizScreenTwo_query$ref,
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
  "name": "OrganizerQuizScreenTwo_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "ORGANIZER_QUIZ.favorite_tools_screen2"
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
(node/*: any*/).hash = 'c91251076d0731a269a4a5c359e18527';

module.exports = node;
