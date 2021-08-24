/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizerQuizScreenOne_query$ref: FragmentReference;
declare export opaque type OrganizerQuizScreenOne_query$fragmentType: OrganizerQuizScreenOne_query$ref;
export type OrganizerQuizScreenOne_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: OrganizerQuizScreenOne_query$ref,
|};
export type OrganizerQuizScreenOne_query$data = OrganizerQuizScreenOne_query;
export type OrganizerQuizScreenOne_query$key = {
  +$data?: OrganizerQuizScreenOne_query$data,
  +$fragmentRefs: OrganizerQuizScreenOne_query$ref,
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
  "name": "OrganizerQuizScreenOne_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "ORGANIZER_QUIZ.favorite_tools_screen1"
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
(node/*: any*/).hash = '05bd75200043e5e10b02b148d9033e2b';

module.exports = node;
