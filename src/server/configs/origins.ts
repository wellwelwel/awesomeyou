/*---------------------------------------------------------------------------------------------
 *  Copyright (c) https://awesomeyou.io and contributors. All rights reserved.
 *  Licensed under the GNU Affero General Public License v3.0. See https://github.com/wellwelwel/awesomeyou/blob/main/LICENSE for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Pessoal, nos seus projetos, optem por manter esses dados privados 🔐
 *
 * O CORS pode ser contornado se alguém souber quais domínios são permitidos ao alterar o cabeçalho "Origin" para um dos domínios permitidos.
 * Navegadores modernos têm políticas de CORS ativadas por padrão para evitar isso, mas bastaria desativar ou usar ferramentas básicas de requisições para modificar o cabeçalho "Origin" e enviar requisições que parecerão legítimas para o servidor.
 *
 * - O CORS é uma boa prática de segurança, mas deve ser combinado com outros fatores, como autenticação e criptografia das requisições.
 */
export const ALLOWED_ORIGINS = new Set([
  'https://awesomeyou.io',
  'https://www.awesomeyou.io',
]);
