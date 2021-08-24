/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TeamPlanLens_activePeopleOrderQuery$ref = any;
type TeamPlanLens_activeTopicsOrderQuery$ref = any;
export type TeamPlanLensQueryVariables = {|
  topicId: string,
  lenseId?: ?string,
  lenseKey?: ?string,
|};
export type TeamPlanLensQueryResponse = {|
  +collapsedIdsConfig: ?{|
    +id: string,
    +value: ?any,
  |},
  +teamPlanCollapsedIdsConfig: ?{|
    +id: string,
    +value: ?any,
  |},
  +goalPlanCollapsedIdsConfig: ?{|
    +id: string,
    +value: ?any,
  |},
  +$fragmentRefs: TeamPlanLens_activeTopicsOrderQuery$ref & TeamPlanLens_activePeopleOrderQuery$ref,
|};
export type TeamPlanLensQuery = {|
  variables: TeamPlanLensQueryVariables,
  response: TeamPlanLensQueryResponse,
|};
*/


/*
query TeamPlanLensQuery(
  $topicId: ID!
  $lenseId: ID
  $lenseKey: String
) {
  collapsedIdsConfig: config(owner: $topicId, config: "collapsed_ids") {
    id
    value
  }
  teamPlanCollapsedIdsConfig: config(owner: $topicId, config: "TEAM_PLAN.collapsed_ids") {
    id
    value
  }
  goalPlanCollapsedIdsConfig: config(owner: $topicId, config: "GOAL_PLAN.collapsed_ids") {
    id
    value
  }
  ...TeamPlanLens_activeTopicsOrderQuery_1fsNJc
  ...TeamPlanLens_activePeopleOrderQuery_1fsNJc
}

fragment TeamPlanLens_activePeopleOrderQuery_1fsNJc on Query {
  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
}

fragment TeamPlanLens_activeTopicsOrderQuery_1fsNJc on Query {
  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {
    id
    name
    order
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lenseKey"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "topicId"
},
v3 = {
  "kind": "Variable",
  "name": "owner",
  "variableName": "topicId"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "value",
    "storageKey": null
  }
],
v6 = {
  "alias": "collapsedIdsConfig",
  "args": [
    {
      "kind": "Literal",
      "name": "config",
      "value": "collapsed_ids"
    },
    (v3/*: any*/)
  ],
  "concreteType": "Config",
  "kind": "LinkedField",
  "name": "config",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v7 = {
  "alias": "teamPlanCollapsedIdsConfig",
  "args": [
    {
      "kind": "Literal",
      "name": "config",
      "value": "TEAM_PLAN.collapsed_ids"
    },
    (v3/*: any*/)
  ],
  "concreteType": "Config",
  "kind": "LinkedField",
  "name": "config",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": "goalPlanCollapsedIdsConfig",
  "args": [
    {
      "kind": "Literal",
      "name": "config",
      "value": "GOAL_PLAN.collapsed_ids"
    },
    (v3/*: any*/)
  ],
  "concreteType": "Config",
  "kind": "LinkedField",
  "name": "config",
  "plural": false,
  "selections": (v5/*: any*/),
  "storageKey": null
},
v9 = {
  "kind": "Variable",
  "name": "lenseId",
  "variableName": "lenseId"
},
v10 = {
  "kind": "Variable",
  "name": "lenseKey",
  "variableName": "lenseKey"
},
v11 = {
  "kind": "Variable",
  "name": "topicId",
  "variableName": "topicId"
},
v12 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v11/*: any*/)
],
v13 = [
  (v4/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "TeamPlanLensQuery",
    "selections": [
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      {
        "args": (v12/*: any*/),
        "kind": "FragmentSpread",
        "name": "TeamPlanLens_activeTopicsOrderQuery"
      },
      {
        "args": (v12/*: any*/),
        "kind": "FragmentSpread",
        "name": "TeamPlanLens_activePeopleOrderQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "TeamPlanLensQuery",
    "selections": [
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      {
        "alias": "activeTopicsOrder",
        "args": [
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "topics"
          },
          (v11/*: any*/)
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      },
      {
        "alias": "activePeopleOrder",
        "args": [
          (v9/*: any*/),
          (v10/*: any*/),
          {
            "kind": "Literal",
            "name": "orderType",
            "value": "people"
          },
          (v11/*: any*/)
        ],
        "concreteType": "CustomOrder",
        "kind": "LinkedField",
        "name": "activeCustomOrder",
        "plural": false,
        "selections": (v13/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f7612bbf4e84ef209b40f9b52276ad98",
    "id": null,
    "metadata": {},
    "name": "TeamPlanLensQuery",
    "operationKind": "query",
    "text": "query TeamPlanLensQuery(\n  $topicId: ID!\n  $lenseId: ID\n  $lenseKey: String\n) {\n  collapsedIdsConfig: config(owner: $topicId, config: \"collapsed_ids\") {\n    id\n    value\n  }\n  teamPlanCollapsedIdsConfig: config(owner: $topicId, config: \"TEAM_PLAN.collapsed_ids\") {\n    id\n    value\n  }\n  goalPlanCollapsedIdsConfig: config(owner: $topicId, config: \"GOAL_PLAN.collapsed_ids\") {\n    id\n    value\n  }\n  ...TeamPlanLens_activeTopicsOrderQuery_1fsNJc\n  ...TeamPlanLens_activePeopleOrderQuery_1fsNJc\n}\n\nfragment TeamPlanLens_activePeopleOrderQuery_1fsNJc on Query {\n  activePeopleOrder: activeCustomOrder(orderType: people, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n\nfragment TeamPlanLens_activeTopicsOrderQuery_1fsNJc on Query {\n  activeTopicsOrder: activeCustomOrder(orderType: topics, topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey) {\n    id\n    name\n    order\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9b4750f25bd8a29cdf8406c322cea58b';

module.exports = node;
