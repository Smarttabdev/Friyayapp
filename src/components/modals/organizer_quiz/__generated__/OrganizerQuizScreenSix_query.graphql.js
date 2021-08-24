/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type OrganizerQuizScreenSix_query$ref: FragmentReference;
declare export opaque type OrganizerQuizScreenSix_query$fragmentType: OrganizerQuizScreenSix_query$ref;
export type OrganizerQuizScreenSix_query = {|
  +config: ?{|
    +id: string,
    +value: ?any,
  |},
  +$refType: OrganizerQuizScreenSix_query$ref,
|};
export type OrganizerQuizScreenSix_query$data = OrganizerQuizScreenSix_query;
export type OrganizerQuizScreenSix_query$key = {
  +$data?: OrganizerQuizScreenSix_query$data,
  +$fragmentRefs: OrganizerQuizScreenSix_query$ref,
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
  "name": "OrganizerQuizScreenSix_query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "config",
          "value": "ORGANIZER_QUIZ.favorite_tools_screen6"
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
(node/*: any*/).hash = '4e4f02f79df82eb6a5ff86c2010896ad';

module.exports = node;
