# Curator Run Report

- Mode: dry-run
- Started: 2026-06-04T00:36:34.744Z
- Finished: 2026-06-04T00:36:34.744Z
- Duration seconds: 0
- Model: main model fallback
- Provider: main model fallback

## 自动转换计数

- checked: 0
- marked_stale: 0
- archived: 0
- reactivated: 0

## Consolidations

```json
[]
```

## Prunings

```json
[]
```

## 新 umbrella skill

```json
[]
```

## 状态迁移

```json
[]
```

## 完整 LLM 输出

LLM curator pass skipped: no active parent session.

## 恢复指引

- 单个 skill：调用 settings.curator restoreSkill action，从 skills-self/.archive/{skillName}/ 恢复。
- 整体回滚：手动解压本次真实运行前的 skills-self/.curator_backups/{timestamp}/skills.tar.gz。
- 若要暂停治理：将 curator.enabled 设为 false。

## Notes

- dry-run: snapshot/state/.curator_state skipped
