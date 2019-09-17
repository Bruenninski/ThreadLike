# ThreadLike
grants threadlike functionality for async functions in Javascript to block and resume funktions from other functions

With new Blocker("eventname") a new Block element will be created, with the .block method the blocking will be set. 
It will released if somewhere chreateBlockEvent("eventname") is called.

It works alike threads that are send to sleep and later waken up again to synchronize the threads for communication purposes
