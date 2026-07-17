from pathlib import Path

path = Path(r'D:/website creating me/wearnest/wearnest/src/component/page/allitem.jsx')
content = path.read_text(encoding='utf-8')
old = '            <div className="w-[300px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm">'
new = '            <div onClick={goToCheckout} role="button" className="w-[300px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm cursor-pointer transition-shadow duration-200 hover:shadow-lg">'
count = content.count(old)
print(f'Found {count} matching wrappers')
if count:
    path.write_text(content.replace(old, new), encoding='utf-8')
    print('Updated wrappers successfully')
else:
    print('No wrappers updated')
