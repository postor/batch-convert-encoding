#!/usr/bin/env node

const { program } = require('commander')
const glob = require('glob')
const languageEncoding = require("detect-file-encoding-and-language")
const { readFile, writeFile } = require('fs/promises')
const { basename, join } = require('path')
const legacy = require('legacy-encoding');

program.name('batch-convert-encoding')
    .description('CLI to convert encoding in batch')
    .usage("[options] [glob] [to]")
    .option('-o, --overwrite', 'overwrite old file')
    .option('-p, --prefix <string>', 'output file prefix', '')
    .option('-s, --suffix <string>', 'output file suffix, `_[encoding]` if not specified')
    .option('-f, --fromencoding <string>', 'from encoding, auto detect if not specified')
    .option('-d, --dryrun', 'dry run, not writing files')
    .option('-h, --help')
    .argument(`[glob]`, 'glob match like `**/*.txt`',)
    .argument(`[toencoding]`, 'to encoding', 'utf-8')
    .action((globPath, toEncoding, { overwrite, prefix, suffix, fromencoding, dryrun }) => {
        // console.log({ globPath ,overwrite})
        // return
        if (!globPath) return program.help()
        glob(globPath.replaceAll('\\', '/'), async (err, matches) => {
            if (err) throw err
            for (let x of matches) {
                let encoding = fromencoding || (await languageEncoding(x)).encoding
                let y = overwrite ? x : fixedPath(x, prefix, suffix===undefined?`_${toEncoding}`:suffix )
                // console.log(y)
                // process.exit()
                if (!dryrun) {
                    let buffer = await readFile(x)
                    let str = legacy.decode(buffer, encoding)
                    await writeFile(y, legacy.encode(str, toEncoding))
                }
                console.log(`[${encoding}]${x}=>[${toEncoding}]${y}`)
            }
        })
    })

program.parse(process.argv)

//    var ext = (/[^./\\]*$/.exec(filename) || [""])[0];
function fixedPath(file = '', prefix = '', suffix = '') {
    // console.log({file,prefix,suffix})
    let b = basename(file)
    let ext = '.' + (/[^./\\]*$/.exec(b) || [""])[0]
    return file.substring(0, file.length - b.length)
        + prefix
        + (b == ext
            ? b + suffix
            : b.substring(0, b.length - ext.length) + suffix + ext
        )
}