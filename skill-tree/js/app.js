// app.js — スキルツリー アプリケーションロジック
// 進捗データは localStorage に保存（キー: claude-skill-tree-v1）

const STORAGE_KEY = 'claude-skill-tree-v1';
const NODE_RADIUS  = 40;
const CANVAS_WIDTH  = 1920;
const CANVAS_HEIGHT = 740;

let progressData = {};
let currentSkillId = null;

// ─────────────────────────────────────────
// 初期化
// ─────────────────────────────────────────
function init() {
  loadProgress();
  renderGroupLabels();
  renderConnections();
  renderNodes();
  updateProgressBar();
}

// ─────────────────────────────────────────
// データ保存・読み込み
// ─────────────────────────────────────────
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    progressData = raw ? JSON.parse(raw) : {};
  } catch (e) {
    progressData = {};
  }
  SKILLS.forEach(s => {
    if (!progressData[s.id]) {
      progressData[s.id] = { status: '未着手', date: null, notes: s.defaultNotes || '' };
    }
  });
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
}

function getStatus(skillId) {
  return progressData[skillId]?.status || '未着手';
}

// ─────────────────────────────────────────
// グループラベル描画
// ─────────────────────────────────────────
function renderGroupLabels() {
  const container = document.getElementById('nodes-container');
  const done = new Set();
  SKILLS.forEach(skill => {
    if (done.has(skill.group)) return;
    done.add(skill.group);
    const group = GROUPS[skill.group];
    const el = document.createElement('div');
    el.className = 'group-label';
    el.textContent = `${skill.group}. ${group.name}`;
    el.style.left  = `${group.x - 72}px`;
    el.style.top   = '10px';
    el.style.width = '144px';
    el.style.borderColor = group.color;
    el.style.color = group.color;
    container.appendChild(el);
  });
}

// ─────────────────────────────────────────
// SVG 接続線描画
// ─────────────────────────────────────────
function renderConnections() {
  const svg = document.getElementById('connections-svg');
  svg.setAttribute('width',  CANVAS_WIDTH);
  svg.setAttribute('height', CANVAS_HEIGHT);
  svg.innerHTML = '';

  // グローフィルター定義
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  [['glow-blue','#4a9eff'], ['glow-green','#4adf8f']].forEach(([id, color]) => {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%');
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '4'); blur.setAttribute('result', 'blur');
    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    ['blur', 'SourceGraphic'].forEach(inp => {
      const n = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
      n.setAttribute('in', inp);
      merge.appendChild(n);
    });
    filter.appendChild(blur); filter.appendChild(merge);
    defs.appendChild(filter);
  });
  svg.appendChild(defs);

  CONNECTIONS.forEach(([fromId, toId]) => {
    const from = SKILLS.find(s => s.id === fromId);
    const to   = SKILLS.find(s => s.id === toId);
    if (!from || !to) return;

    const fromStatus = getStatus(fromId);
    let stroke, glowFilter, opacity, strokeWidth;

    if (fromStatus === '習得済み') {
      stroke = '#4adf8f'; glowFilter = 'url(#glow-green)'; opacity = 1; strokeWidth = 2.5;
    } else if (fromStatus === '学習中') {
      stroke = '#4a9eff'; glowFilter = 'url(#glow-blue)'; opacity = 0.8; strokeWidth = 2;
    } else {
      stroke = '#222238'; glowFilter = ''; opacity = 0.6; strokeWidth = 1.5;
    }

    const dx = to.x - from.x;
    const d  = `M${from.x},${from.y} C${from.x + dx*0.4},${from.y} ${to.x - dx*0.4},${to.y} ${to.x},${to.y}`;

    if (glowFilter) {
      const gp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      gp.setAttribute('d', d); gp.setAttribute('stroke', stroke);
      gp.setAttribute('stroke-width', strokeWidth + 2);
      gp.setAttribute('fill', 'none'); gp.setAttribute('opacity', '0.35');
      gp.setAttribute('filter', glowFilter);
      svg.appendChild(gp);
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d); path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', strokeWidth);
    path.setAttribute('fill', 'none'); path.setAttribute('opacity', opacity);
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
  });
}

// ─────────────────────────────────────────
// ノード描画
// ─────────────────────────────────────────
function renderNodes() {
  const container = document.getElementById('nodes-container');
  container.querySelectorAll('.skill-node').forEach(el => el.remove());

  SKILLS.forEach(skill => {
    const status = getStatus(skill.id);
    const group  = GROUPS[skill.group];

    const node = document.createElement('div');
    node.className = `skill-node status-${statusClass(status)}`;
    node.id = `node-${skill.id}`;
    node.style.left = `${skill.x - NODE_RADIUS}px`;
    node.style.top  = `${skill.y - NODE_RADIUS}px`;
    node.style.width  = `${NODE_RADIUS * 2}px`;
    node.style.height = `${NODE_RADIUS * 2}px`;
    node.style.borderColor = status === '未着手' ? '#2a2a44' : group.color;
    node.title = skill.name;
    node.addEventListener('click', () => openModal(skill.id));

    const icon = document.createElement('span');
    icon.className = 'node-icon';
    icon.textContent = skill.icon;
    node.appendChild(icon);

    // 習得済みバッジ
    if (status === '習得済み') {
      const badge = document.createElement('span');
      badge.className = 'node-badge';
      badge.textContent = '✓';
      node.appendChild(badge);
    }

    const label = document.createElement('div');
    label.className = 'node-label';
    label.textContent = skill.name;
    node.appendChild(label);

    container.appendChild(node);
  });
}

function statusClass(status) {
  return { '未着手': 'untouched', '学習中': 'learning', '習得済み': 'mastered' }[status] || 'untouched';
}

// ─────────────────────────────────────────
// プログレスバー更新
// ─────────────────────────────────────────
function updateProgressBar() {
  const total    = SKILLS.length;
  const mastered = SKILLS.filter(s => getStatus(s.id) === '習得済み').length;
  const learning = SKILLS.filter(s => getStatus(s.id) === '学習中').length;

  document.getElementById('progress-text').textContent =
    `習得済み: ${mastered} / ${total}  |  学習中: ${learning}`;

  const pct = Math.round((mastered / total) * 100);
  const bar = document.getElementById('progress-bar');
  bar.style.width = `${pct}%`;
  bar.style.background = pct >= 80 ? '#ffd700' : pct >= 50 ? '#4adf8f' : '#4a9eff';
}

// ─────────────────────────────────────────
// モーダル
// ─────────────────────────────────────────
function openModal(skillId) {
  const skill = SKILLS.find(s => s.id === skillId);
  if (!skill) return;
  currentSkillId = skillId;

  const data  = progressData[skillId];
  const group = GROUPS[skill.group];

  document.getElementById('modal-icon').textContent = skill.icon;
  document.getElementById('modal-name').textContent = skill.name;
  document.getElementById('modal-group').textContent = `${skill.group}. ${skill.group === 'A' ? '初期セットアップ' : group.name}`;
  document.getElementById('modal-group').style.color = group.color;

  document.getElementById('modal-achievement').innerHTML  = escapeHtml(skill.achievement).replace(/\n/g, '<br>');
  document.getElementById('modal-howto').innerHTML        = escapeHtml(skill.howto).replace(/\n/g, '<br>');
  document.getElementById('modal-verification').innerHTML = escapeHtml(skill.verification).replace(/\n/g, '<br>');
  document.getElementById('modal-notes').value = data.notes || '';
  document.getElementById('modal-date').textContent =
    data.date ? `最終更新: ${new Date(data.date).toLocaleString('ja-JP')}` : '未記録';

  updateStatusButtons(data.status);

  // 前提スキル警告
  const warn = document.getElementById('prereq-warning');
  const unmet = (skill.requires || []).filter(id => {
    const st = getStatus(id);
    return st === '未着手' || st === '学習中';
  });
  if (unmet.length > 0) {
    const names = unmet.map(id => SKILLS.find(s => s.id === id)?.name || id).join('、');
    warn.textContent = `⚠️ 前提スキル未完了: ${names}`;
    warn.style.display = 'block';
  } else {
    warn.style.display = 'none';
  }

  document.getElementById('modal-overlay').classList.add('active');
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.getElementById('modal').classList.remove('active');
  currentSkillId = null;
}

function setStatus(status) {
  if (!currentSkillId) return;
  progressData[currentSkillId].status = status;
  updateStatusButtons(status);
}

function updateStatusButtons(current) {
  document.querySelectorAll('.status-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.status === current);
  });
}

function saveSkill() {
  if (!currentSkillId) return;
  progressData[currentSkillId].notes = document.getElementById('modal-notes').value;
  progressData[currentSkillId].date  = new Date().toISOString();
  saveProgress();
  renderConnections();
  renderNodes();
  updateProgressBar();

  const btn = document.getElementById('save-btn');
  const orig = btn.textContent;
  btn.textContent = '保存しました ✓';
  btn.style.background = '#4adf8f';
  btn.style.color = '#0d0d1a';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 1500);

  document.getElementById('modal-date').textContent =
    `最終更新: ${new Date().toLocaleString('ja-JP')}`;
}

function resetProgress() {
  if (!confirm('すべての進捗をリセットしますか？\nこの操作は元に戻せません。')) return;
  localStorage.removeItem(STORAGE_KEY);
  loadProgress();
  renderConnections();
  renderNodes();
  updateProgressBar();
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
document.addEventListener('DOMContentLoaded', init);
