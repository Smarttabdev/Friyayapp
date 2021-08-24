/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type OrganizerQuizScreenSix_query$ref = any;
export type OrganizerQuizScreenSixRefetchQueryVariables = {|
  owner: string
|};
export type OrganizerQuizScreenSixRefetchQueryResponse = {|
  +$fragmentRefs: OrganizerQuizScreenSix_query$ref
|};
export type OrganizerQuizScreenSixRefetchQuery = {|
  variables: OrganizerQuizScreenSixRefetchQueryVariables,
  response: OrganizerQuizScreenSixRefetchQueryResponse,
|};
*/


/*
query OrganizerQuizScreenSixRefetchQuery(
  $owner: ID!
) {
  ...OrganizerQuizScreenSix_query_1JS2nm
}

fragment OrganizerQuizScreenSix_query_1JS2nm on Query {
  config(owner: $owner, config: "ORGANIZER_QUIZ.favorite_tools_screen6") {
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
    "name": "OrganizerQuizScreenSixRefetchQuery",
    "selections": [
      {
        "args": [
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "OrganizerQuizScreenSix_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrganizerQuizScreenSixRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "config",
            "value": "ORGANIZER_QUIZ.favorite_tools_screen6"
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
    "cacheID": "7114de2dbe37ecf4c1ed6f9ad5e01550",
    "id": null,
    "metadata": {},
    "name": "OrganizerQuizScreenSixRefetchQuery",
    "operationKind": "query",
    "text": "query OrganizerQuizScreenSixRefetchQuery(\n  $owner: ID!\n) {\n  ...OrganizerQuizScreenSix_query_1JS2nm\n}\n\nfragment OrganizerQuizScreenSix_query_1JS2nm on Query {\n  config(owner: $owner, config: \"ORGANIZER_QUIZ.favorite_tools_screen6\") {\n    id\n    value\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '8bc0a61c7dba42df7bcf96b73e7e411a';

module.exports = node;
