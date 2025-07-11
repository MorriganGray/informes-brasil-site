"use client";

import withAuth from '../../lib/withAuth';

function AdminPage() {
  return (
    <div>
      <h1>Painel de Administração</h1>
      <p>Bem-vindo ao painel de administração!</p>
    </div>
  );
}

export default withAuth(AdminPage);