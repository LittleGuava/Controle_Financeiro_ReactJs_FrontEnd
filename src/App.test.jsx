import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('mostra no menu lateral os links para cada tela', () => {
  render(<MemoryRouter><App /></MemoryRouter>);

  expect(screen.getByRole('link', { name: /Painel de Controle/ })).toHaveAttribute('href', '/dashboard');
  expect(screen.getByRole('link', { name: /^Login$/ })).toHaveAttribute('href', '/login');
  expect(screen.getByRole('link', { name: /Cadastrar Usuário/ })).toHaveAttribute('href', '/user');
  expect(screen.getByRole('link', { name: /Receitas/ })).toHaveAttribute('href', '/gain');
  expect(screen.getByRole('link', { name: /Despesas/ })).toHaveAttribute('href', '/expense');
});
