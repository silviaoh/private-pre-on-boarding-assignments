import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  IoPencilSharp,
  IoTrashOutline,
  IoCheckmarkSharp,
  IoClose,
} from 'react-icons/io5';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../apis/api';
import Input from '../components/Input';
import { FlexWrapperStyle } from '../styles/common';

const TodoList = () => {
  const navigate = useNavigate();

  // 리스트 state
  const [todoList, setTodoList] = useState([]);
  const [todoContent, setTodoContent] = useState('');

  // 리스트 수정 state
  const [modifyContent, setModifyContent] = useState('');
  const [isModify, setIsModify] = useState(false);

  // 선택한 todo state
  const [selectedId, setSelectedId] = useState('');

  // Dom 선택
  const inputRef = useRef('');
  const modifyRef = useRef();

  // 리스트 불러오기
  const setInitialTodoList = async () => {
    try {
      const response = await getTodos();
      setTodoList(response?.data);
    } catch (err) {
      alert(err?.response?.data.message);
    }
  };

  useEffect(() => {
    setInitialTodoList();
  }, []);

  // 로그아웃
  const handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  // todo 함수
  const checkTodoClick = async (e, todo) => {
    e.preventDefault();
    const isCompleted = {
      todo: todo.todo,
      isCompleted: !todo.isCompleted,
    };

    try {
      const response = await updateTodo(todo.id, isCompleted);
      setTodoList(prevTodoList =>
        prevTodoList.map(prevTodo =>
          prevTodo.id === response?.data.id
            ? { ...prevTodo, isCompleted: response?.data?.isCompleted }
            : prevTodo
        )
      );
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const editTodoClick = async (e, todo) => {
    e.preventDefault();

    const modifiedTodo = {
      todo: modifyContent,
      isCompleted: todo.isCompleted,
    };
    try {
      const response = await updateTodo(todo.id, modifiedTodo);
      setTodoList(prevTodoList =>
        prevTodoList.map(prevTodo =>
          prevTodo.id === response?.data.id
            ? { ...prevTodo, ...response?.data }
            : prevTodo
        )
      );
      setIsModify(false);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const deleteTodoClick = async (e, todo) => {
    e.preventDefault();
    try {
      await deleteTodo(todo.id);
      setTodoList(prevTodo =>
        prevTodo.filter(prevTodo => prevTodo.id !== todo.id)
      );
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const addTodoClick = async e => {
    e.preventDefault();
    const newTodo = { todo: todoContent };
    try {
      const response = await createTodo(newTodo);
      if (response?.status === 201) {
        setTodoList(prevTodoList => [...prevTodoList, response?.data]);
        setTodoContent('');
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const enableEditMode = (e, todo) => {
    e.preventDefault();
    setSelectedId(todo.id);
    setModifyContent(todo.todo);
    setIsModify(true);
  };

  return (
    <TodoSection justifyContent="center">
      <TodoContainer flexDirection="column" alignItems="center">
        <TodoHeader>&#9997; Todo List</TodoHeader>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        <TodoForm
          justifyContent="space-between"
          alignItems="center"
          gap="0.8rem"
        >
          <Input
            type="text"
            name="content"
            value={todoContent}
            ref={inputRef}
            onChange={e => setTodoContent(e.target.value)}
          />
          <AddButton onClick={addTodoClick}>+</AddButton>
        </TodoForm>
        <ListContainer>
          {todoList?.length > 0
            ? todoList.map(todo => (
                <React.Fragment key={todo.id}>
                  {isModify && todo.id === selectedId ? (
                    <ModifyContainer>
                      <Input
                        type="text"
                        name="modifyContent"
                        ref={modifyRef}
                        defaultValue={todo.todo}
                        onChange={e => setModifyContent(e.target.value)}
                      />
                      <Button
                        className="confirm"
                        onClick={e => editTodoClick(e, todo)}
                      >
                        <IoCheckmarkSharp className="icon" />
                      </Button>
                      <Button
                        className="close"
                        onClick={e => {
                          e.preventDefault();
                          setIsModify(false);
                        }}
                      >
                        <IoClose className="icon" />
                      </Button>
                    </ModifyContainer>
                  ) : (
                    <TodoListStyle>
                      <TodoText
                        className={!todo.isCompleted ? 'yet' : 'done'}
                        onClick={e => checkTodoClick(e, todo)}
                      >
                        {todo.todo}
                      </TodoText>
                      <Button
                        className="modifiy"
                        onClick={e => enableEditMode(e, todo)}
                      >
                        <IoPencilSharp className="icon" />
                      </Button>
                      <Button
                        className="delete"
                        onClick={e => deleteTodoClick(e, todo)}
                      >
                        <IoTrashOutline className="icon" />
                      </Button>
                    </TodoListStyle>
                  )}
                </React.Fragment>
              ))
            : ''}
        </ListContainer>
      </TodoContainer>
    </TodoSection>
  );
};

const TodoSection = styled.section`
  ${FlexWrapperStyle}
  width: 100vw;
  height: 100vh;
  padding: 5rem 0;
`;

const TodoContainer = styled.article`
  ${FlexWrapperStyle}
  width: 30rem;
  padding: 2rem 0;
  overflow: scroll;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
`;

const TodoForm = styled.form`
  ${FlexWrapperStyle}
  width: 100%;
  padding: 1rem 2rem;
`;

const TodoHeader = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: 1rem;
  font-size: 1.5rem;
`;

const TodoText = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.lightGray};
  }

  &.done {
    color: ${({ theme }) => theme.colors.gray};
    text-decoration: line-through;
  }
`;

const AddButton = styled.button`
  font-size: 1.8rem;
  padding: 0.2rem 0.9rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.blue};

  &:hover {
    filter: brightness(110%);
  }
`;

const LogoutButton = styled.button`
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  position: absolute;
  top: 2.2rem;
  right: 2rem;
  background-color: ${({ theme }) => theme.colors.darkGray};

  &:hover {
    filter: brightness(90%);
  }
`;

const ListContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const TodoListStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 12fr 1fr 1fr;

  .icon {
    margin-top: 0.6rem;
  }
`;

const ModifyContainer = styled.form`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 12fr 1fr 1fr;
  .icon {
    margin-top: 0.6rem;
  }
`;

const Button = styled.button`
  padding: 0.2rem;
  font-size: 1.5rem;
  opacity: 0.7;

  &.modifiy:hover,
  &.confirm:hover {
    color: ${({ theme }) => theme.colors.blue};
  }

  &.delete:hover,
  &.close:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;
export default TodoList;
