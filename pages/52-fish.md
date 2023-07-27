# Fish Shell

https://fishshell.com/

reverse search on 3.6.0 - there is a ppa

# Quick Overview of Shells

Bash is the default on everything. As the Born Again Shell, it replaced the old school shell, sh. It was developed in 1989. Bash is great because it is everywhere.

Zsh is what you will find on a mac machine (and some linux distros). It was adopted by Macos in 2019, before that they were still shipping an old version of bash that was distributed on the GPLv2. Zsh will probably look better than bash to the average user, largely because the packagers and distributers of zsh put more effort into customizing the look than bash distributors. Zsh came out around te same time as bash at 1990. 

Notice how these two popular shells were built right at the end of 80's and gained popularity in the early years of the 90's. It makes sense that they are a little dated.

Enter Fish shell, in their words "a command line shell for the 90s". Fish shell does a lot, but the real value is in better theming, and better autocomplete than bash or zsh.

# Quick Getting Started

Make sure you install at least version 3.6.0, that was when they added support for the ctrl+r reverse history search (which was the only reason I didn't use fish for a long time).

Once you get it installed, check out `fish_config`. This will open a local web-ui where you can configure theming and view other settings.

Fish is configured in `~/.config/fish/`. It supports using multiple config files out of the box, which avoids the problem of having a massive `.bashrc` file.

Here is my `~/.config/fish/conf.d/alex.fish` config file:

```
function commit
	git add --all
	git commit -m "$argv"
	git push
end

# have ctrl+backspace delete previous word
bind \e\[3\;5~ kill-word
# have ctrl+delete delete following word
bind \b  backward-kill-word

set -U fish_user_paths ~/.local/bin $fish_user_paths
set -U fish_user_paths ~/.dotnet $fish_user_paths
set -U fish_user_paths ~/.dotnet/tools $fish_user_paths

export VISUAL=vim
export EDITOR="$VISUAL"
export DOTNET_WATCH_RESTART_ON_RUDE_EDIT=1
export DOTNET_CLI_TELEMETRY_OPTOUT=1
```