# batch-convert-encoding
batch convert encoding | 批量转换编码

```
npx batch-convert-encoding **/*.txt utf-8
```
or

```
npm i batch-convert-encoding -g
batch-convert-encoding **/*.txt utf-8
```

help 

```
Usage: batch-convert-encoding [options] [glob] [to]

CLI to convert encoding in batch

Arguments:
  glob                         glob match like `**/*.txt`
  toencoding                   to encoding (default: "utf-8")

Options:
  -o, --overwrite              overwrite old file | 覆盖
  -p, --prefix <string>        output file prefix (default: "") | 前缀
  -s, --suffix <string>        output file suffix, `_[encoding]` if not specified | 后缀
  -f, --fromencoding <string>  from encoding, auto detect if not specified | 原编码
  -d, --dryrun                 dry run, not writing files 
  -h, --help
```