var updateMessages = {
    updateUserInput(data) {
        
        if (data.length) {
            this.playerInput.addIncomingInputs(...data);
        }

    }
};

export { updateMessages };