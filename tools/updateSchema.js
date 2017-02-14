import path from 'path'
import gaze from 'gaze'
import { graphql } from 'graphql'
import { parse } from 'graphql/language'
import { introspectionQuery, buildASTSchema } from 'graphql/utilities'
import { writeFile, readFile } from './lib/fs'

/**
 * Creates a schema.json file for auto completion in your IDE
 */
async function updateSchema() {
  const input = path.resolve(__dirname, '..', 'src', 'data', 'schema.graphqls')
  const output = path.resolve(__dirname, '..', 'src', 'data', 'schema.json')

  const processSchema = async () => {
    try {
      const body = await readFile(input)
      const ast = parse(body)
      const schema = buildASTSchema(ast)
      const result = await (graphql(schema, introspectionQuery));
      await writeFile(output, JSON.stringify(result, null, 2))
      console.log('schema updated')
    } catch (err) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(err, null, 2),
      );
    }
  };

  // run update schema for the first time
  await processSchema()

  // subscribe the watcher over the data/directory
  if (process.argv.includes('--watch')) {
    const watcher = await new Promise((resolve, reject) => {
      gaze(input, (err, val) => (err ? reject(err) : resolve(val)));
    });
    watcher.on('changed', processSchema);
  }
}

export default updateSchema;
