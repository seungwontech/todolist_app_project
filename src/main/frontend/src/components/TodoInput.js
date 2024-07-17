import React from 'react';

function TodoInput({ handleSubmit, input, handleChange }) {
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Todo &nbsp;
                <input
                    type="text"
                    required
                    value={input}
                    onChange={handleChange}
                />
            </label>
            <input type="submit" value="Create" />
        </form>
    );
}

export default TodoInput;