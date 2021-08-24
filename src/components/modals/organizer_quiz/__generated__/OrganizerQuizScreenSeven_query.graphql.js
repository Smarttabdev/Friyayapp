/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizerQuizScreenSeven_query$ref: FragmentReference;
declare export opaque type OrganizerQuizScreenSeven_query$fragmentType: OrganizerQuizScreenSeven_query$ref;
export type OrganizerQuizScreenSeven_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: OrganizerQuizScreenSeven_query$ref,
|};
export type OrganizerQuizScreenSeven_query$data = OrganizerQuizScreenSeven_query;
export type OrganizerQuizScreenSeven_query$key = {
  +$data?: OrganizerQuizScreenSeven_query$data,
  +$fragmentRefs: OrganizerQuizScreenSeven_query$ref,
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
  "name": "OrganizerQuizScreenSeven_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "ORGANIZER_QUIZ.favorite_tools_screen7"
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
(node/*: any*/).hash = 'e6ab47723866c22765dfcd9cb3fbb6ac';

module.exports = node;
