# Guide

1. [Config](#config)
2. [Tags](#tags)

## <a id="config"></a>Config

Stores configs for a tip (card), topic (board), and domain.

This is a generic way of storing config for an object.

### Why

Not every object requires additional config, so I think this is more suitable than adding it as table columns.

### **Notes**

Configs are whitelisted, ie. you can only update a set of allowed config names -- the list on the backend need to be updated to allow new config names.

### Allowed Config Names

- linked_chat
- linked_video_chat

### Querying With GraphQL

#### All Configs

```
query {
  tips {
    edges {
      node {
        id
        title
        configs {
          id
          config
          value
        }
      }
    }
  }
}
```

#### Specific Config

```
query {
  tips {
    edges {
      node {
        id
        title
        config(config: "linked_chat") {
          id
          config
          value
        }
      }
    }
  }
}
```

### Querying With REST

Configs will be returned along with tips, topics, and domains query.

```js
tip.attributes.configs;
// {
//   linked_chat: 1,
//   ...
// }
```

### Updating Config with GraphQL Mutation

```
mutation {
  setConfig(input: { owner: "Tip:1", config: "linked_chat", value: 1 }) {
    config {
      id
      config
      value
    }
  }
}
```

or use the helper

```js
mutations.setConfig({ owner: 'Tip:1', config: 'linked_chat', value: 1 });
```

### Updating Config with REST

```js
updateCard({
  id: card.id,
  attributes: {
    ...
    configs: {
      linked_chat: 1
    }
  }
})
```

## <a id="tags"></a>Tags

Topic can now be tagged.

### Attributes

`topic.attributes.tag_list`

### Create/Update

Set the `tag_list` attribute on the topic object and pass it to `createTopic` or `updateTopic` thunk.

```javascript
topic = {
  attributes: {
    tag_list: ['goal', 'project']
  }
};
```

### Querying

#### Any

```javascript
getTopics({
  tagged: ['goal', 'project']
});
```

Will find topics tagged as `goal` or `project`.

#### Exclude

```javascript
getTopics({
  tagged: ['project'],
  tagOp: 'exclude'
});
```

Will find topics not tagged as `project`.

#### Exact

```javascript
getTopics({
  tagged: ['goal', 'project'],
  tagOp: 'exact'
});
```

Will find topics which have the exact tags of `goal` and `project`. Topics which have more or less tags will not be returned.

### GraphQL

Querying with graphql works the same way. Please check the schema on GraphiQL IDE at [https://stageapi.friyayapp.io/graphiql](https://stageapi.friyayapp.io/graphiql).
