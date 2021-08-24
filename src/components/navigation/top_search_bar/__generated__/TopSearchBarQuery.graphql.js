/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TopSearchBarQueryVariables = {||};
export type TopSearchBarQueryResponse = {|
  +chatUnreadCount: ?{|
    +id: string,
    +count: number,
  |}
|};
export type TopSearchBarQuery = {|
  variables: TopSearchBarQueryVariables,
  response: TopSearchBarQueryResponse,
|};
*/


/*
query TopSearchBarQuery {
  chatUnreadCount {
    id
    count
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChatUnreadCount",
    "kind": "LinkedField",
    "name": "chatUnreadCount",
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
        "name": "count",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TopSearchBarQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TopSearchBarQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a2457f226626007623a36e92079c224f",
    "id": null,
    "metadata": {},
    "name": "TopSearchBarQuery",
    "operationKind": "query",
    "text": "query TopSearchBarQuery {\n  chatUnreadCount {\n    id\n    count\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3ab79cbb2948238a7d3392423867a5c5';

module.exports = node;
