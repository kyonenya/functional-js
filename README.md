- 関数ファクトリ：db実行関数にdbを注入したものとarray実行関数にarrayを注入したものは、カリー化のおかげでどちらも関数として帰ってきて、同じ振る舞いをするものと見なせる。
- 部分適用の自作関数：可変長引数で任意個数の引数を受け取り、reduceで第一引数から順に一つづつbindして返す。
