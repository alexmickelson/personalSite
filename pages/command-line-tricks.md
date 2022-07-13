# share your history across shells

add to .bashrc

```
PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND; history -a; history -c; history -r}"
```