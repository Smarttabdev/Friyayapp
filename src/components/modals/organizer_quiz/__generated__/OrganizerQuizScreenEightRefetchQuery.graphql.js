/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenEight_query$ref = any;
export type OrganizerQuizScreenEightRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenEightRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenEight_query$ref
|};
export type OrganizerQuizScreenEightRefetchQuery = {|
  variables: OrganizerQuizScreenEightRefetchQueryVariables,
  response: OrganizerQuizScreenEightRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenEightRefetchQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenEight_query_1JS2nm
}

fragment OrganizerQuizScreenEight_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen8") {
    id
    value
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "owner"
  }
],
v1 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "owner"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrganizerQuizScreenEightRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenEight_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenEightRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen8"
          },
          (v1/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "f37c8958ca8e8b03940f82efd9b824ee",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenEightRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenEightRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenEight_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenEight_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen8\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '69aeccdc20199b64fde4851f6bbb6a80';

module.exports = node;
