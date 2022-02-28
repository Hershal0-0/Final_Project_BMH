n = int(input())
student_marks = {}
for _ in range(n):
    line = input().split()
    name, scores = line[0], line[1:]
    scores = map(float, scores)
    student_marks[name] = scores
query_name = input()
result=sum(student_marks[query_name])
result/=3
print("{:.2f}".format(result))