// FocusFlow — ADHD-Friendly Focus Timer PWA
(function() {
    'use strict';

    const STORAGE_KEY = 'focusflow_data';
    const LANG_KEY = 'focusflow_lang';
    const DAILY_GOAL = 120; // 2 hours in minutes
    const CIRCUMFERENCE = 2 * Math.PI * 90; // ~565.48

    const I18N = {
        en: {
            selectLanguage: 'Select Language', cancel: 'Cancel', close: 'Close',
            whatAreYouWorkingOn: 'What are you working on?',
            intentionHint: 'Name your task before you start. ADHD brains work better with a clear target.',
            focusDuration: 'Focus Duration', startFocus: 'Start Focus',
            focusMessage: 'Stay focused. You\'ve got this.',
            sessionComplete: 'Session Complete!', gaveUp: 'Gave Up',
            anotherSession: 'Another Session', takeBreak: 'Take a Break',
            breakTime: 'Break Time', skipBreak: 'Skip Break',
            todaysFocus: 'Today\'s Focus', dailyGoal: 'Daily Goal: 2 hours',
            focusStats: 'Focus Stats', todaySessions: 'Today',
            todayMinutes: 'Today\'s Focus', streak: 'Current Streak',
            totalSessions: 'All Time', recentSessions: 'Recent Sessions',
            completed: 'completed', gaveUpStatus: 'gave up',
            minShort: 'min', breakDuration: '5 min break'
        },
        zh: {
            selectLanguage: '选择语言', cancel: '取消', close: '关闭',
            whatAreYouWorkingOn: '你正在做什么？',
            intentionHint: '开始前先说出你的任务。ADHD 大脑需要清晰的目标才能集中注意力。',
            focusDuration: '专注时长', startFocus: '开始专注',
            focusMessage: '保持专注，你可以的。',
            sessionComplete: '专注完成！', gaveUp: '放弃了',
            anotherSession: '再来一次', takeBreak: '休息一下',
            breakTime: '休息时间', skipBreak: '跳过休息',
            todaysFocus: '今日专注', dailyGoal: '每日目标：2小时',
            focusStats: '专注统计', todaySessions: '今天',
            todayMinutes: '今日专注', streak: '连续天数',
            totalSessions: '总计', recentSessions: '最近记录',
            completed: '已完成', gaveUpStatus: '已放弃',
            minShort: '分钟', breakDuration: '5分钟休息'
        },
        es: {
            selectLanguage: 'Seleccionar Idioma', cancel: 'Cancelar', close: 'Cerrar',
            whatAreYouWorkingOn: '¿En qué estás trabajando?',
            intentionHint: 'Nombra tu tarea antes de empezar. Los cerebros con TDAH funcionan mejor con un objetivo claro.',
            focusDuration: 'Duración del Enfoque', startFocus: 'Iniciar Enfoque',
            focusMessage: 'Mantente enfocado. Puedes hacerlo.',
            sessionComplete: '¡Sesión Completada!', gaveUp: 'Abandonado',
            anotherSession: 'Otra Sesión', takeBreak: 'Tomar Descanso',
            breakTime: 'Tiempo de Descanso', skipBreak: 'Saltar Descanso',
            todaysFocus: 'Enfoque de Hoy', dailyGoal: 'Meta Diaria: 2 horas',
            focusStats: 'Estadísticas', todaySessions: 'Hoy',
            todayMinutes: 'Enfoque de Hoy', streak: 'Racha Actual',
            totalSessions: 'Total', recentSessions: 'Sesiones Recientes',
            completed: 'completado', gaveUpStatus: 'abandonado',
            minShort: 'min', breakDuration: '5 min descanso'
        },
        ja: {
            selectLanguage: '言語を選択', cancel: 'キャンセル', close: '閉じる',
            whatAreYouWorkingOn: '何に取り組みますか？',
            intentionHint: '始める前にタスクを宣言しましょう。ADHDの脳は明確な目標があると集中しやすいです。',
            focusDuration: '集中時間', startFocus: '集中開始',
            focusMessage: '集中し続けて。あなたならできる。',
            sessionComplete: 'セッション完了！', gaveUp: '中断',
            anotherSession: 'もう一度', takeBreak: '休憩する',
            breakTime: '休憩タイム', skipBreak: '休憩をスキップ',
            todaysFocus: '今日の集中', dailyGoal: '目標：2時間',
            focusStats: '集中統計', todaySessions: '今日',
            todayMinutes: '今日の集中', streak: '連続日数',
            totalSessions: '累計', recentSessions: '最近のセッション',
            completed: '完了', gaveUpStatus: '中断',
            minShort: '分', breakDuration: '5分休憩'
        },
        de: {
            selectLanguage: 'Sprache wählen', cancel: 'Abbrechen', close: 'Schließen',
            whatAreYouWorkingOn: 'Woran arbeitest du?',
            intentionHint: 'Nenne deine Aufgabe bevor du startest. ADHD-Gehirne arbeiten besser mit einem klaren Ziel.',
            focusDuration: 'Fokus-Dauer', startFocus: 'Fokus Starten',
            focusMessage: 'Bleib fokussiert. Du schaffst das.',
            sessionComplete: 'Sitzung Abgeschlossen!', gaveUp: 'Aufgegeben',
            anotherSession: 'Nochmal', takeBreak: 'Pause Machen',
            breakTime: 'Pause', skipBreak: 'Pause Überspringen',
            todaysFocus: 'Heutiger Fokus', dailyGoal: 'Tagesziel: 2 Stunden',
            focusStats: 'Fokus-Statistiken', todaySessions: 'Heute',
            todayMinutes: 'Heutiger Fokus', streak: 'Aktuelle Serie',
            totalSessions: 'Gesamt', recentSessions: 'Letzte Sitzungen',
            completed: 'abgeschlossen', gaveUpStatus: 'aufgegeben',
            minShort: 'Min', breakDuration: '5 Min Pause'
        },
        fr: {
            selectLanguage: 'Choisir la langue', cancel: 'Annuler', close: 'Fermer',
            whatAreYouWorkingOn: 'Sur quoi travaillez-vous ?',
            intentionHint: 'Nommez votre tâche avant de commencer. Les cerveaux TDAH fonctionnent mieux avec un objectif clair.',
            focusDuration: 'Durée de Focus', startFocus: 'Démarrer le Focus',
            focusMessage: 'Restez concentré. Vous pouvez le faire.',
            sessionComplete: 'Session Terminée !', gaveUp: 'Abandonné',
            anotherSession: 'Encore une Session', takeBreak: 'Prendre une Pause',
            breakTime: 'Temps de Pause', skipBreak: 'Passer la Pause',
            todaysFocus: 'Focus du Jour', dailyGoal: 'Objectif : 2 heures',
            focusStats: 'Statistiques', todaySessions: 'Aujourd\'hui',
            todayMinutes: 'Focus du Jour', streak: 'Série en Cours',
            totalSessions: 'Total', recentSessions: 'Sessions Récentes',
            completed: 'terminé', gaveUpStatus: 'abandonné',
            minShort: 'min', breakDuration: '5 min pause'
        }
    };

    // State
    let data = { sessions: [], settings: {} };
    let currentLang = 'en';
    let selectedDuration = 15;
    let timerInterval = null;
    let timeRemaining = 0;
    let totalTime = 0;
    let isPaused = false;
    let currentTask = '';

    // DOM
    const $ = id => document.getElementById(id);

    // Data
    function loadData() {
        try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { sessions: [], settings: {} }; }
        catch { data = { sessions: [], settings: {} }; }
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadLang() {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved && I18N[saved]) currentLang = saved;
    }

    function t(key) { return I18N[currentLang][key] || I18N.en[key] || key; }

    function applyI18n() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = t(key);
        });
    }

    // Helpers
    function todayKey() { return new Date().toISOString().split('T')[0]; }

    function todayMinutes() {
        const key = todayKey();
        return data.sessions
            .filter(s => s.date === key && s.completed)
            .reduce((sum, s) => sum + s.duration, 0);
    }

    function todaySessions() {
        const key = todayKey();
        return data.sessions.filter(s => s.date === key).length;
    }

    function totalSessions() { return data.sessions.length; }

    function streak() {
        let count = 0;
        const d = new Date();
        while (true) {
            const key = d.toISOString().split('T')[0];
            const has = data.sessions.some(s => s.date === key && s.completed);
            if (has) { count++; d.setDate(d.getDate() - 1); }
            else break;
        }
        return count;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return { min: String(m).padStart(2, '0'), sec: String(s).padStart(2, '0') };
    }

    // Phases
    function showPhase(phaseId) {
        document.querySelectorAll('.phase').forEach(p => p.classList.add('hidden'));
        $(phaseId).classList.remove('hidden');
    }

    // Ring
    function setRing(elementId, fraction) {
        const el = $(elementId);
        if (!el) return;
        const offset = CIRCUMFERENCE * (1 - fraction);
        el.style.strokeDasharray = CIRCUMFERENCE;
        el.style.strokeDashoffset = offset;
    }

    // Progress
    function updateProgress() {
        const mins = todayMinutes();
        const pct = Math.min(100, (mins / DAILY_GOAL) * 100);
        $('progress-time').textContent = mins + ' ' + t('minShort');
        $('progress-fill').style.width = pct + '%';
    }

    // Stats
    function updateStats() {
        $('stat-today').textContent = todaySessions() + ' sessions';
        $('stat-minutes').textContent = todayMinutes() + ' ' + t('minShort');
        $('stat-streak').textContent = streak() + ' days';
        $('stat-total').textContent = totalSessions() + ' sessions';

        const key = todayKey();
        const recent = data.sessions.filter(s => s.date === key).reverse().slice(0, 10);
        $('session-log').innerHTML = recent.length === 0
            ? '<p style="color:var(--text-muted);font-size:13px">No sessions yet</p>'
            : recent.map(s => `
                <div class="session-item">
                    <span class="si-task">${escHtml(s.task)}</span>
                    <span class="si-time">${s.completed ? t('completed') : t('gaveUpStatus')} · ${s.duration}${t('minShort')}</span>
                </div>
            `).join('');
    }

    function escHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    // Timer
    function startFocus() {
        const task = $('intention-input').value.trim();
        if (!task) {
            $('intention-input').focus();
            $('intention-input').style.borderColor = 'var(--danger)';
            setTimeout(() => $('intention-input').style.borderColor = '', 1500);
            return;
        }

        currentTask = task;
        totalTime = selectedDuration * 60;
        timeRemaining = totalTime;
        isPaused = false;

        $('task-label').textContent = task;
        updateTimerDisplay();
        setRing('ring-progress', 1);
        showPhase('phase-focus');
        startTick();
    }

    function startTick() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (isPaused) return;
            timeRemaining--;
            updateTimerDisplay();
            setRing('ring-progress', timeRemaining / totalTime);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                completeSession(true);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const { min, sec } = formatTime(Math.max(0, timeRemaining));
        $('timer-min').textContent = min;
        $('timer-sec').textContent = sec;
    }

    function togglePause() {
        isPaused = !isPaused;
        const btn = $('pause-btn');
        if (isPaused) {
            btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            btn.title = 'Resume';
        } else {
            btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
            btn.title = 'Pause';
        }
    }

    function stopFocus() {
        clearInterval(timerInterval);
        completeSession(false);
    }

    function completeSession(completed) {
        const duration = completed ? selectedDuration : Math.round((totalTime - timeRemaining) / 60);

        data.sessions.push({
            date: todayKey(),
            task: currentTask,
            duration: duration,
            completed: completed,
            timestamp: Date.now()
        });
        saveData();

        if (completed) {
            $('done-icon').textContent = '🎉';
            $('done-title').textContent = t('sessionComplete');
            $('done-title').style.color = 'var(--success)';
        } else {
            $('done-icon').textContent = '😅';
            $('done-title').textContent = t('gaveUp');
            $('done-title').style.color = 'var(--warning)';
        }

        $('done-task').textContent = currentTask;
        $('done-time').textContent = duration + ' ' + t('minShort');

        showPhase('phase-done');
        updateProgress();

        // Try to play sound
        try { $('bell').play().catch(() => {}); } catch {}
    }

    function startBreak() {
        const breakDuration = 5 * 60;
        totalTime = breakDuration;
        timeRemaining = breakDuration;

        const { min, sec } = formatTime(timeRemaining);
        $('break-min').textContent = min;
        $('break-sec').textContent = sec;
        setRing('break-ring', 1);

        showPhase('phase-break');

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            timeRemaining--;
            const { min, sec } = formatTime(Math.max(0, timeRemaining));
            $('break-min').textContent = min;
            $('break-sec').textContent = sec;
            setRing('break-ring', timeRemaining / totalTime);

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                resetToIntention();
            }
        }, 1000);
    }

    function skipBreak() {
        clearInterval(timerInterval);
        resetToIntention();
    }

    function resetToIntention() {
        $('intention-input').value = '';
        showPhase('phase-intention');
        updateProgress();
    }

    // Toast
    function showToast(msg) {
        const toast = $('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // Modal helpers
    function openModal(id) { $(id).classList.add('active'); }
    function closeModal(id) { $(id).classList.remove('active'); }

    // Init
    function init() {
        loadLang();
        loadData();
        applyI18n();
        updateProgress();

        // Duration buttons
        document.querySelectorAll('.dur-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedDuration = parseInt(btn.dataset.min);
            });
        });

        // Start
        $('start-btn').addEventListener('click', startFocus);
        $('intention-input').addEventListener('keydown', e => {
            if (e.key === 'Enter') startFocus();
        });

        // Timer controls
        $('pause-btn').addEventListener('click', togglePause);
        $('stop-btn').addEventListener('click', stopFocus);

        // Done actions
        $('again-btn').addEventListener('click', resetToIntention);
        $('break-btn').addEventListener('click', startBreak);
        $('skip-break-btn').addEventListener('click', skipBreak);

        // Language modal
        $('lang-btn').addEventListener('click', () => openModal('lang-modal'));
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentLang = btn.dataset.lang;
                localStorage.setItem(LANG_KEY, currentLang);
                applyI18n();
                updateProgress();
                closeModal('lang-modal');
            });
        });

        // Stats modal
        $('stats-btn').addEventListener('click', () => {
            updateStats();
            openModal('stats-modal');
        });

        // Close modals
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-overlay').forEach(m => closeModal(m.id));
            });
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) closeModal(overlay.id);
            });
        });

        // Prevent back button from losing focus
        window.addEventListener('beforeunload', e => {
            if (!$('phase-focus').classList.contains('hidden')) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
