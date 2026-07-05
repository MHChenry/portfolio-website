# Curator Run Report

- Mode: dry-run
- Started: 2026-06-01T04:50:22.549Z
- Finished: 2026-06-01T04:50:41.611Z
- Duration seconds: 19.062
- Model: qwen3.5-plus
- Provider: TomatoClaw

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

{"type":"thinking","thinking":"现在我看到了所有 skill 的情况：\n\n1. **frontend-design-fusion** - created_by: \"human\", pinned: false\n2. **git-essentials** - created_by: \"human\", pinned: false\n3. **vercel-deploy** - created_by: \"human\", pinned: false\n4. **winapp-cli** - created_by: \"human\", pinned: false\n\n所有 4 个 skill 的 created_by 都是 \"human\"，这意味着它们都是用户手动创建的（foreground/manual -> human）。\n\n根据硬规则 #1：**只允许操作 created_by=agent 的 skill；human/bundled/hub 一律只读。**\n\n因此，这 4 个 skill 都不能被本轮 curator review 操作，全部需要跳过。\n\n另外，候选 skill JSON 是空数组 `[]`，这也确认了没有 agent-created 的 skill 需要处理。\n\n输出最终摘要。","thinkingSignature":"reasoning_content"}
---

## Curator Review — 最终摘要 (DRY-RUN)

### 分析结果

| 类别 | 数量 | Skill 名称 | 原因 |
|------|------|-----------|------|
| **Consolidated** | 0 | — | 无符合条件的 agent-created skill |
| **Pruned** | 0 | — | 无符合条件的 agent-created skill |
| **Skipped** | 4 | `frontend-design-fusion`, `git-essentials`, `vercel-deploy`, `winapp-cli` | 全部为 `created_by: human`，按规则 #1 只读 |

### 详细说明

1. **当前技能库状态**：共 4 个 skill，全部位于工作区 `skills/` 目录下
2. **创建来源**：所有 skill 均为 `created_by: human`（foreground/manual 手动创建）
3. **Pinned 状态**：无 pinned skill
4. **本轮操作**：无

### 结论

**本轮无需执行任何合并操作。**

原因：
- 候选列表为空 `[]`
- 现有全部 skill 均为 human-created，根据硬规则 #1 必须跳过
- 没有 agent-created 的 skill 可供 umbrella consolidation

---

*DRY-RUN 完成。如需实际执行合并，请提供包含 agent-created skill 的候选列表。*

## 恢复指引

- 单个 skill：调用 settings.curator restoreSkill action，从 skills-self/.archive/{skillName}/ 恢复。
- 整体回滚：手动解压本次真实运行前的 skills-self/.curator_backups/{timestamp}/skills.tar.gz。
- 若要暂停治理：将 curator.enabled 设为 false。

## Notes

- dry-run: snapshot/state/.curator_state skipped
