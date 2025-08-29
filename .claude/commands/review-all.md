This is tmux-clI:

# tmux-cli Command to interact with CLI applications

`tmux-cli` is a bash command that enables Claude Code to control CLI applications
running in separate tmux panes - launch programs, send input, capture output,
and manage interactive sessions. Run `tmux-cli --help` for detailed usage
instructions.

Example uses:
- Interact with a script that waits for user input
- Launch another Claude Code instance to have it perform some analysis or review or
  debugging etc
- Run a Python script with the Pdb debugger to step thru its execution, for
  code-understanding and debugging
- Launch web apps and test them with browser automation MCP tools like Puppeteer


First run "wtc". Use tmux-cli to launch "ccr <issue>" for each open PR in this repo. Before pushing merge target branch into the feature branch. trigger another review after push with mentoning claude code with "@claude review" inside the pr. 