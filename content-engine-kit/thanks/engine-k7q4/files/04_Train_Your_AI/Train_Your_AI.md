# Train Your AI on Your Voice and System

Any capable AI assistant works. The setup is the same idea everywhere: give it standing instructions, give it your files, and test it. Pick one and do it well.

## What every setup needs
1. **The instruction block** (Instruction_Block.txt in this folder)
2. **Your voice files:** phrase bank, voice intake transcript, do and don't list (03)
3. **Your brand kit** (05)
4. **The system files:** workflows and prompts from the main kit (09 Tools and Setup, Full Kit Files), plus the Format DNA guide (01)
5. **Your research files** as you build them: format vault, hook bank, outlier worksheet (08)

## Option A: Claude Projects
1. Go to claude.ai, open **Projects**, click **Create project**, name it "Content Engine."
2. Paste the instruction block into **Project instructions**.
3. Upload your voice files, brand kit, and the system files into **Project knowledge**.
4. Optional: if your plan supports Skills, add each folder from the main kit's 04_SKILLS as a skill (search "Skills" in settings; menu names change).
5. Test: start a chat in the project and ask, "Write 3 hook options about [topic] using my phrase bank. List the lines you used."

Claude Free allows up to 5 projects. Pro or higher is better for weekly batches because of usage limits.

## Option B: ChatGPT custom GPT
1. In ChatGPT, open **GPTs**, then **Create**, then the **Configure** tab.
2. Name it "Content Engine." Paste the instruction block into **Instructions**.
3. Upload your voice files, brand kit, and system files under **Knowledge**.
4. Turn on Code Interpreter (or data analysis) so it can do the outlier math on your CSVs.
5. Save it as private ("Only me"). Test with the same 3-hook prompt.

Creating custom GPTs needs a paid plan on most accounts. If yours does not allow it, use a ChatGPT Project with the same instructions and files.

## Option C: Grok Bot (my setup)
I run this whole workflow in Grok Bot. Here is the shape of it, so you can copy it if you use Grok Bot too:
1. Create a bot for your content. Give it the instruction block as its standing instructions.
2. Add each workflow from the main kit's 04_SKILLS as a skill, so you can say "run outlier research" or "write this week's batch."
3. Connect the apps you use, like Google Drive for your files and Google Sheets for your Content Hub, so it can read your phrase bank and write scripts where you keep them.
4. Save your phrase bank, brand kit, and do and don't list where the bot can always read them, and tell it to read them before every script.
5. Set a weekly routine for the research refresh and script batch, then review the drafts yourself.
Menu names and features change, so follow the current Grok Bot help for each step. Any AI on this page can run the same system.

## Option D: Cursor (or Claude Code)
Best if you want the AI to work directly with files and run the outlier script.
1. Make a folder called content-engine and copy the main kit files into it (09 Full Kit Files).
2. Add your voice files and brand kit to a folder called brand/.
3. Put the instruction block in a rules file (in Cursor, a project rule; in Claude Code, a CLAUDE.md file at the folder root).
4. Copy the 04_SKILLS folders where your tool reads skills (Claude Code: .claude/skills/).
5. Ask it to run tools/outliers.py on your scraped data, then write scripts into a scripts/ folder.

## Test your setup (do this once, any AI)
- [ ] Ask for 3 hooks on one topic. Do they sound like you?
- [ ] Ask it what an outlier is. It should say 100K+ views and 3x the creator's median.
- [ ] Ask it to use the caption as a hook. It should refuse and ask for the spoken hook.
- [ ] Ask for a script. It should list the phrase-bank lines it used in the middle.
- [ ] Check for em dashes and hype words. There should be none.

If any test fails, re-check that the instruction block and your files are actually loaded, then try again.

## Keep training it
- Every week, paste in your edits: what you changed while filming and why.
- Every month, add new phrase-bank lines.
- When a post hits 3x your own median, tell the AI which format and hook it was.
