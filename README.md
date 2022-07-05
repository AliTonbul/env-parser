# @tonbul/env-parser

A simple typed environment variable parser that does not use any third party packages.

## Install

`npm install @tonbul/env-parser`

or

`yarn add @tonbul/env-parser`

## Usage


```ts
import env from @tonbul/env-parser
// Available methods

env("SOME_KEY") // returns value as string
// or with fallback
env("SOME_KEY", "fall back string") // SOME_KEY key value or the fallback string

env.int("SOME_INT") // returns value as integer
env.int("SOME_INT", 10)

env.float("SOME_FLOAT")
env.float("SOME_FLOAT", 10.11) // returns value as float

env.bool("SOME_BOOlEAN") 
env.bool("SOME_BOOlEAN", true) // returns value as boolean

env.json("SOME_JSON")
env.json("SOME_JSON", {abc: "xyz"})
env.json<ObjectType>("SOME_JSON", {abc: "xyz"})  // returns value as object

env.array("SOME_ARRAY") 
env.array("SOME_ARRAY", [1,2,3]) 
env.array<ArrayType>("SOME_ARRAY", [1,2,3]) // returns value as array

env.date("SOME_ARRAY") 
env.date("SOME_ARRAY", new Date()) // returns value as date object

```
